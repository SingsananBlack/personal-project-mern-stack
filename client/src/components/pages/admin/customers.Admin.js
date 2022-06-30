import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Switch } from 'antd';
import moment from 'moment';
import MenubarAdmin from './menubar.Admin';
import NavbarAdmin from './navbar.Admin';
// Redux
import { useSelector } from 'react-redux';
// Use functions
import { listUsers, changeStatus } from '../../functions/users.Function';

const CustomersAdmin = () => {
  const [search, setSearch] = useState('');
  const [filterUsersData, setFilterUsersData] = useState([]);
  const { user } = useSelector((state) => ({ ...state })); // Get token in state from redux
  const [usersData, setUsersData] = useState([]);

  /* Load data from server */
  const loadData = (authtoken) => {
    listUsers(authtoken)
      .then((res) => {
        setUsersData(res.data);
        setFilterUsersData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  useEffect(() => {
    loadData(user.token);
  }, [user]);
  /* End of load data from server */

  /* Search username */
  useEffect(() => {
    const result = usersData.filter((value) => {
      return value.username.toLowerCase().match(search.toLowerCase());
    });
    setFilterUsersData(result);
  }, [search, usersData]);
  /* End of search username */

  /* ChangeRole Status */
  const handleChangeStatus = (event, id) => {
    const value = {
      id: id,
      enabled: event,
    };
    changeStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  /* End of changeRole Status */

  /* React DataTable */
  const columns = [
    {
      name: 'Username',
      selector: (row) => row.username,
      width: '160px',
    },
    {
      name: 'E-mail',
      selector: (row) => row.email,
      width: '300px',
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      // width: '100px',
    },
    {
      name: 'Status',
      cell: (row) => (
        <Switch
          style={{
            width: '50px',
            height: '25px',
            border: '1px solid',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          checked={row.enabled}
          onChange={(event) => handleChangeStatus(event, row._id)}
        />
      ),
      // width: '100px',
    },
    {
      name: 'CreatedAt',
      selector: (row) => moment(row.createdAt).format('DD-MM-YYYY'),
      width: '200px',
    },
    {
      name: 'UpdatedAt',
      selector: (row) => moment(row.updatedAt).startOf(row.updatedAt).fromNow(),
      width: '200px',
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 700,
      },
    },
  };
  /* End of react datatable */

  return (
    <div className="admin-body">
      <MenubarAdmin />
      {/* ------------- END OF NAVBAR-MENU ------------- */}
      <section id="interface">
        <NavbarAdmin />
        <div className="content-admin">
          <div style={{ marginTop: '90px', display:'flex', justifyContent:'center' }}>
            <h1>Customers</h1>
          </div>
          <div style={{ marginTop: '20px' }}>
            <DataTable
              columns={columns}
              data={filterUsersData}
              customStyles={customStyles}
              pagination
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search for username"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  style={{
                    fontSize: '15px',
                    outline: 'none',
                    padding: '5px',
                    border: '1px solid #d7dbe6',
                    borderRadius: '4px',
                  }}
                />
              }
            />
          </div>
        </div>
      </section>
      {/* ------------- END OF INTERFACE ------------- */}
    </div>
  );
};

export default CustomersAdmin;
