import React from 'react';

const SideNavLinks = (props) => {
    return (
        <React.Fragment>
            <li className='i-wrap'>
                <a className='nav-i-link flexv-3' target="_blank" href='https://github.com/jxw7410/yuutubu'>
                    <i className="fab fa-github"></i>
                    {props.type === 'top' ? null : <span className='flexh-3'>Git</span>}
                </a>

                {props.type === 'top' ?  <div className='i-msg'>GitHub</div> : null}
            </li>

            <li className='i-wrap'>
                <a className='nav-i-link flexv-3' target="_blank" href='https://www.linkedin.com/in/jian-hong-wu-b1535284/'>
                    <i className="fab fa-linkedin"></i>
                    {props.type === 'top' ? null : <span className='flexh-3'>Linkedin</span>}
                </a>

                {props.type === 'top' ? <div className='i-msg'>LinkedIn</div> : null}
            </li>

            {
                props.type === 'main' ? null :
                    <li className='i-wrap'>
                        <a className='nav-i-link flexv-3' target="_blank" href='https://angel.co/jian-wu-12?public_profile=1'>
                            <i className="fab fa-angellist"></i>
                            {props.type === 'top' ? null : <span className='flexh-3'>AngelList</span>}
                        </a>

                        {props.type === 'top' ? <div className='i-msg'>AngelList</div> : null}
                    </li>

            }
        </React.Fragment>
    )
}

export default SideNavLinks;