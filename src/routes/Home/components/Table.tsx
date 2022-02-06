/* eslint-disable operator-linebreak */
import dayjs from 'dayjs';
import React, {useState} from 'react';
import Table from 'unify-react-desktop/build/Table';

type Props = {
  data: any[];
};

export default function CustomTable({data}: Props) {
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');

  const header = [
    {content: 'Username', key: 'username'},
    {
      content: (
        <div
          onClick={() => {
            setSortType('name');
            if (sortType === 'name') {
              setSortOrder(
                sortOrder === 'ascending' ? 'descending' : 'ascending',
              );
            }
          }}
        >
          Name
        </div>
      ),
      key: 'name',
      sortIcon: sortType === 'name' ? sortOrder : 'inactive',
    },
    {
      content: (
        <div
          onClick={() => {
            setSortType('email');
            if (sortType === 'email') {
              setSortOrder(
                sortOrder === 'ascending' ? 'descending' : 'ascending',
              );
            }
          }}
        >
          Email
        </div>
      ),
      key: 'email',
      sortIcon: sortType === 'email' ? sortOrder : 'inactive',
    },
    {
      content: (
        <div
          onClick={() => {
            setSortType('gender');
            if (sortType === 'gender') {
              setSortOrder(
                sortOrder === 'ascending' ? 'descending' : 'ascending',
              );
            }
          }}
        >
          Gender
        </div>
      ),
      key: 'gender',
      sortIcon: sortType === 'gender' ? sortOrder : 'inactive',
    },
    {
      content: (
        <div
          onClick={() => {
            setSortType('date');
            if (sortType === 'date') {
              setSortOrder(
                sortOrder === 'ascending' ? 'descending' : 'ascending',
              );
            }
          }}
        >
          Registered Date
        </div>
      ),
      key: 'date',
      sortIcon: sortType === 'date' ? sortOrder : 'inactive',
    },
  ];

  return (
    <Table
      header={header}
      data={data
        .sort((a, b) => {
          if (sortType === 'name') {
            const fullNameA = a.name.first + ' ' + a.name.last;
            const fullNameB = b.name.first + ' ' + b.name.last;
            return sortOrder === 'ascending'
              ? fullNameA.localeCompare(fullNameB)
              : fullNameB.localeCompare(fullNameA);
          }
          if (sortType === 'email') {
            return sortOrder === 'ascending'
              ? a.email.localeCompare(b.email)
              : b.email.localeCompare(a.email);
          }
          if (sortType === 'gender') {
            return sortOrder === 'ascending'
              ? a.gender.localeCompare(b.gender)
              : b.gender.localeCompare(a.gender);
          }
          if (sortType === 'date') {
            return sortOrder === 'ascending'
              ? a.registered.date.localeCompare(b.registered.date)
              : b.registered.date.localeCompare(a.registered.date);
          }
        })
        .map((item: any) => ({
          contents: {
            username: item.login.username,
            name: item.name.first + ' ' + item.name.last,
            email: item.email,
            gender: item.gender,
            date: dayjs(item.registered.date).format('DD-MM-YYYY HH:mm'),
          },
        }))}
      highlightRowOnHover
      useContainerWidth
      zebraStripes
    />
  );
}
