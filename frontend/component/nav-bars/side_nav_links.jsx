import React from 'react';

const SideNavLinks = (props) => {
    return (
        <>
            <li>
                <a  target="_blank" href='https://github.com/jxw7410/yuutubu'>
                    <i className="fab fa-github"></i>
                    {props.type === 'top' ? null : <span>Git</span>}
                </a>
            </li>

            <li>
                <a target="_blank" href='https://www.linkedin.com/in/jian-hong-wu-b1535284/'>
                    <i className="fab fa-linkedin"></i>
                    {props.type === 'top' ? null : <span>Linkedin</span>}
                </a>
            </li>

            {
                props.type === 'main' ?
                    null
                    :
                    <li>
                        <a target="_blank" href='https://angel.co/jian-wu-12?public_profile=1'>
                            <i className="fab fa-angellist"></i>
                            {props.type === 'top' ? null : <span>AngelList</span>}
                        </a>
                    </li>

            }
        </>
    )
}

export default SideNavLinks;