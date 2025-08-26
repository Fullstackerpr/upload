import React, { memo, useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";

type User = {
  id: string;
  name: string;
  age: number | string;
  gender: string;
  file: string;
};

const initialState = {
  id: "",
  name: "",
  age: "",
  gender: "",
  file: "",
};

const Images = () => {
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [data, setData] = useState<User[]>([]);
  const [_file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setForm({
        ...form,
        file: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      ...form,
      id: uuid(),
      age: Number(form.age),
    };

    setData((prev) => [...prev, newUser]);
    setForm(initialState);
    setFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Add User</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={form.age}
          onChange={handleChange}
          className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select your gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="file"
          name=""
          id=""
          accept="image/"
          onChange={handleFilechange}
          className="w-full cursor-pointer bg-gray-300 text-gray-700 py-2 px-2 rounded-md "
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      <div className="mt-6 max-w-md space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="mx-10">
                <h1 className="font-bold py-2 text-2xl text-blue-900">My Profile</h1>
              <div >
                <img src={item.file} alt={item.name} className="w-[250px] h-[250px] rounded-[50%] object-cover"/>
              </div>
              <div>
                <div className="my-3">
                  <h1 className="font-bold text-lg text-blue-900"><span className="text-gray-600">name: </span> {item.name}</h1>
                  <p className="font-bold text-lg text-blue-900"><span className="text-gray-600">age: </span> {item.age || "-"}</p>
                  <p className="font-bold text-lg text-blue-900"><span className="text-gray-600">gender: </span> {item.gender}</p>
                </div>
                <span className="text-sm text-gray-400">
                  #{item.id.slice(0, 5)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Images);
