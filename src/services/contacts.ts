import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid, PermissionStatus } from 'react-native';
import Contacts from 'react-native-contacts';
import moment, { Moment } from 'moment';

export const canAccessContacts = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
};

export const requestContactsAccess = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;

  const permission: PermissionStatus = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: 'Contacts',
      message:
        "We need access to your contacts in order to read your contact's birthdays",
      buttonPositive: 'Okay',
    },
  );

  return permission === 'granted';
};

export type Contact = {
  id: number;
  name: string;
  thumbnailPath?: string;
  dateOfBirth: Moment;
  nextBirthday: Moment;
  age: number;
};

export const getContacts = (): Promise<Contact[]> => {
  return new Promise((resolve, reject) => {
    Contacts.getAll((error, nonTransformedContacts) => {
      if (error) reject(error);
      const now = moment();
      const currentYear = now.year();

      const contacts = nonTransformedContacts
        .filter((contact) => contact.birthday !== undefined)
        .map(
          (contact, index): Contact => {
            const dateOfBirth = moment({ ...contact.birthday });
            const nextBirthday = moment(dateOfBirth).year(currentYear);
            if (nextBirthday.isBefore(now)) {
              nextBirthday.year(currentYear + 1);
            }

            return {
              id: index,
              name: `${contact.givenName} ${contact.familyName}`,
              dateOfBirth,
              nextBirthday,
              thumbnailPath: contact.thumbnailPath || undefined,
              age: now.diff(dateOfBirth, 'years'),
            };
          },
        )
        .sort((a, b) => {
          return a.nextBirthday.valueOf() - b.nextBirthday.valueOf();
        });

      resolve(contacts);
    });
  });
};

export type UseContacts = {
  canUseContacts: boolean;
  contacts: Contact[];
};

export const useContacts = (): UseContacts => {
  const [canUseContacts, setCanUseContacts] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect((): void => {
    const fetchContactInfo = async () => {
      try {
        let _canUseContacts = await canAccessContacts();
        if (!_canUseContacts) _canUseContacts = await requestContactsAccess();
        setCanUseContacts(_canUseContacts);

        if (!_canUseContacts) return;
        setContacts(await getContacts());
      } catch (e) {
        setCanUseContacts(false);
      }
    };

    fetchContactInfo();
  }, []);

  return {
    canUseContacts,
    contacts,
  };
};
