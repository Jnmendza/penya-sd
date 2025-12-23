"use client";
import { registerMember } from "@/app/actions/registerMember";

export default function TestForm() {
  return (
    <form
      action={async (formData) => {
        const res = await registerMember(formData);
        alert(res.message);
      }}
      className='p-10 bg-white border'
    >
      <h2 className='font-bold mb-4'>Dev Test Registration</h2>
      <input
        name='full_name'
        placeholder='Name'
        className='border p-2 block mb-2'
        required
      />
      <input
        name='email'
        placeholder='Email'
        className='border p-2 block mb-2'
        required
      />
      <input
        name='phone'
        placeholder='Phone'
        className='border p-2 block mb-2'
      />
      <button type='submit' className='bg-blue-500 text-white p-2'>
        Simulate Payment & Register
      </button>
    </form>
  );
}
