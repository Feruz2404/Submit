import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PatternFormat } from 'react-number-format';
import { FaUser } from "react-icons/fa";

const Main = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    country: '',
    gender: '',
    birthdate: '',
  });


  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      const updateUser = {
        id: edit.id,
        ...formData,
      };
      setData((prev) => prev.map((item) => (item.id === edit.id ? updateUser : item)));
      setEdit(null);
    } else {
      const newUser = {
        id: uuidv4(),
        ...formData,
      };
      setData((prev) => [...prev, newUser]);
    }
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      phoneNumber: '',
      country: '',
      gender: '',
      birthdate: '',
    });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure?')) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };


  const handleEdit = (item) => {
    setFormData(item);
    setEdit(item);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <div className='flex gap-3 h-[500px] text-blue-700'>
      <form className='w-80 p-7 bg-slate-500 h-[100%]' onSubmit={handleSubmit}>
        <input
          required
          className='w-full h-10 px-3 mb-3'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          type='text'
          placeholder='First Name'
        />
        <input
          required
          className='w-full h-10 px-3 mb-3'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          type='text'
          placeholder='Last Name'
        />
        <input
          required
          className='w-full h-10 px-3 mb-3'
          name='username'
          value={formData.username}
          onChange={handleChange}
          type='text'
          placeholder='Username'
        />
        <PatternFormat
          required
          className='w-full h-10 px-3 mb-3'
          name='phoneNumber'
          value={formData.phoneNumber}
          onValueChange={(values) => {
            setFormData((prev) => ({ ...prev, phoneNumber: values.value }));
          }}
          format='+998 (##) ### ## ##'
          allowEmptyFormatting
          mask='_'
          placeholder='Phone Number'
        />
        <input
          required
          className='w-full h-10 px-3 mb-3'
          name='country'
          value={formData.country}
          onChange={handleChange}
          type='text'
          placeholder='Country'
        />
        <select
          required
          className='w-full h-10 px-3 mb-3'
          name='gender'
          value={formData.gender}
          onChange={handleChange}
        >
          <option value=''>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Female'>Other</option>
        </select>
        <input
          required
          className='w-full h-10 px-3 mb-3'
          name='birthdate'
          value={formData.birthdate}
          onChange={handleChange}
          type='date'
        />
        <button className='w-full h-10 px-3 mb-3 bg-cyan-600 rounded-2xl text-[18px] text-white hover:bg-teal-950'>
          {edit ? 'Update' : 'Create'}
        </button>
      </form>
      <div className='flex-1 flex gap-3 flex-wrap items-start content-start py-3 text-white'>
        {data?.map((item) => (

          <div key={item.id} className='w-72 py-3 shadow-white text-center border-2 flex flex-col gap-1 rounded-xl bg-indigo-700 '>
            <div className='w-20 h-20 bg-slate-200 rounded-full mx-auto flex items-center text-[40px] text-gray-800 text-center pl-5'><FaUser/></div>
            <h3>{`${item.firstName} ${item.lastName}`}</h3>
            <p>Username: {item.username}</p>
            <p>Phone: {item.phoneNumber}</p>
            <p>Country: {item.country}</p>
            <p>Gender: {item.gender}</p>
            <p>Birthdate: {item.birthdate}</p>
            <div className='flex gap-8 justify-center'>
              <button onClick={() => handleDelete(item.id)} className='bg-red-700 p-1 rounded-lg px-7 hover:bg-red-800'>Delete</button>
              <button onClick={() => handleEdit(item)} className='bg-fuchsia-600 p-2 rounded-lg px-7 hover:bg-fuchsia-800'>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;




// let user = {
//     fname: "",
//     lname: "",
//     username: "", // unique
//     password: "", // min - 6
//     country: "", 
//     gender: "", 
//     birthdate: "", 
//     tel: "", 
// }
