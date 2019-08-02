import React from 'react';

const SideNavLinks = (props) => {
    return (
        <>
            <li className='icon-wrapper'>
                <a className='nav-icon-links flex-vert-ctr-2' target="_blank" href='https://github.com/jxw7410/yuutubu'>
                    <i className="fab fa-github"></i>
                    {props.type === 'top' ? null : <span className='flex-hzntal-ctr-2'>Git</span>}
                </a>

                {props.type === 'top' ?  <div className='icon-message-nav'>GitHub</div> : null}
            </li>

            <li className='icon-wrapper'>
                <a className='nav-icon-links flex-vert-ctr-2' target="_blank" href='https://www.linkedin.com/in/jian-hong-wu-b1535284/'>
                    <i className="fab fa-linkedin"></i>
                    {props.type === 'top' ? null : <span className='flex-hzntal-ctr-2'>Linkedin</span>}
                </a>

                {props.type === 'top' ? <div className='icon-message-nav'>LinkedIn</div> : null}
            </li>

            {
                props.type === 'main' ? null :
                    <li className='icon-wrapper'>
                        <a className='nav-icon-links flex-vert-ctr-2' target="_blank" href='https://angel.co/jian-wu-12?public_profile=1'>
                            <i className="fab fa-angellist"></i>
                            {props.type === 'top' ? null : <span className='flex-hzntal-ctr-2'>AngelList</span>}
                        </a>

                        {props.type === 'top' ? <div className='icon-message-nav'>AngelList</div> : null}
                    </li>

            }
        </>
    )
}

export default SideNavLinks;