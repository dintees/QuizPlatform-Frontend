import React from 'react'
import { BlockMath } from 'react-katex';
import { BsFillEmojiFrownFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='color-primary text-center'>
            <div style={{ fontSize: "180px" }}><BsFillEmojiFrownFill /></div>
            <h2 className='color-primary'>
                <BlockMath math="\int_0^4 (18x^2 + 2x + 1) dx" />
            </h2>
            <div>The page you are looking for does not exist or an error occured.</div>
            <Link to="/" className='a-link'>Go to my page.</Link>
        </div>
    )
}

export default NotFound
