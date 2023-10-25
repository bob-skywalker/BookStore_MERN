import React, { useEffect } from 'react'
import Spinner from '../../components/Spinner'
import { useState } from 'react'
import axios from 'axios'
import BackButton from '../../components/BackButton'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const DeleteBook = () => {
  const [book, setBook] = useState({})
  const [title, setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState(0)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=> {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setLoading(false);
        setBook(res.data)
        setTitle(res.data.title);
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear);
      })
      .catch((err) => {
        setLoading(false);
        alert('An error happended. Please check console');
        console.log(err);
      })
  }, [])

  const handleDelete = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setLoading(false);
        console.log("Item Deleted!")
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
        alert("An error has happended.")
      })
  }

  return (
    <div className='p-4'>
    <BackButton />
    <h1 className='text-3xl my-4'>Show Book</h1>
    {loading ? (
      <Spinner /> 
    ): (
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title</span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Author</span>
          <span>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
          <span>{book.publishYear}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Create Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
          <button className='p-2 bg-red-300 m-8' onClick={handleDelete}>
          DELETE
          </button>
      </div>
    )
    }
  </div>
  )
}

export default DeleteBook