import '../../../components/Pre-nav-bar/Pre-nav-bar.css';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';

interface PreNavBarProps {
  customClass?: string;
  id?: string;
}

interface docFormType {
  docName: string,
}

export function PreNavBar({ customClass, id }: PreNavBarProps) {
  const [doc, setDoc] = useState<docFormType>();
    useEffect(() => {
      fetch(`/api/documents/${id}`)
        .then(doc => doc.json())
        .then(data => {
          setDoc(data);
          console.log(data)
    })
        .catch(err => console.error({error: err.message}))
    },[id])
  return (
    <nav className={`pre-nav-bar ${customClass}`}>
      <ul className='pre-nav-left'>
        <li className='nav-left-content'>
          <Link className='link' to='/'>
            Home
          </Link>
        </li>
        <li className='nav-left-content'>
          <Link className='link documents-link' to='/documents'>
            Documents
          </Link>
        </li>
        <li className='nav-left-content'>
          <Link className='link documents-link' to={`/documents/${id}`}>
            {doc?.docName}
          </Link>
        </li>
      </ul>
    </nav>
  )
}