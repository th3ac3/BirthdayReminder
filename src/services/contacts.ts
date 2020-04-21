import { Platform, PermissionsAndroid, PermissionStatus, DrawerLayoutAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import moment from 'moment';

export const getCanAccessContacts = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
};

export const requestAccessContacts = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;

  const permission: PermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: "We need access to your contacts in order to read your contact's birthdays",
    buttonPositive: 'Okay',
  });

  return permission === 'granted';
};

export const getContacts = (): Promise<Contacts.Contact[]> => {
  return new Promise((resolve, reject) => {
    Contacts.getAll((error, contacts) => {
      if (error) reject(error);
      resolve(
        contacts
          .filter((contact) => contact.birthday !== undefined)
          .map((contact) => ({ ...contact, birthday: { ...contact.birthday, month: contact.birthday.month - 1 } }))
          .sort((a, b) => {
            const now = moment();
            const year = now.year();
            let aDate = moment({ ...a.birthday, year });
            let bDate = moment({ ...b.birthday, year });

            // If BDay date was before right now then next BDay won't occur till next year
            if (aDate.isBefore(now)) {
              aDate.year(aDate.year() + 1);
            }
            if (bDate.isBefore(now)) {
              bDate.year(bDate.year() + 1);
            }

            return aDate.valueOf() - bDate.valueOf();
          }),
      );
    });
  });
};
