import React from 'react'
import { Link } from 'react-router-dom'
import "../css/navbar.css"

const Navbar = (props) => {
    const {name} = props
    return (
        <nav className='nav-bar'>
            <h1 className='owlcha-name'>Owl Cha สาขาราชภัฏนครปฐม</h1>
            <Link to='/'className='btn-home'>
                <span>{name==undefined?"HOME":"Back"}</span>
            </Link>
        </nav>
    )
}

export default Navbar