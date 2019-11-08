import React from 'react';

const SideNavLinks = (props) => {

  const anchorClass = [
    'flexv-3',
    props.type === 'top' ? "nav-i-link" : ""
  ].join(" ");

  function renderIconContainer(href, tag){
    return (
      <li className='i-wrap'>
        <a className={anchorClass}
          target="_blank"
          href={href}>
            <i className={`fab fa-${tag.toLowerCase()}`} />
            {
              props.type === 'top' ? null : 
                <span className='flexh-3'>
                  {tag}
                </span>
            }
          </a>
          {
            props.type ==='top' ?
              <div className='i-msg'>
                {tag}
              </div> : null
          }
      </li>
    )
  }


  return (
    <>
      {
        renderIconContainer(
          'https://github.com/jxw7410/yuutubu',
          'GitHub'
        )
      } 

      {
        renderIconContainer(
          'https://www.linkedin.com/in/jian-hong-wu-b1535284/',
          'LinkedIn'
        )
      }
    
      {
        props.type === 'main' ? null :
          renderIconContainer(
            'https://angel.co/jian-wu-12?public_profile=1',
            'AngelList'
          )
      }
    </>
  )
}

export default React.memo(SideNavLinks);