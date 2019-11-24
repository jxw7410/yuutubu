import React from 'react';

const SideNavLinks = ({type}) => {

  const anchorClass = [
    'flex-vertical--style-3',
    type === 'top' ? "nav-icon-link" : ""
  ].join(" ");

  function renderIconContainer(href, tag) {
    return (
      <li className='icon-wrap'>
        <a className={anchorClass}
          target="_blank"
          href={href}>
          <i className={`fab fa-${tag.toLowerCase()}`} />
          {
            type === 'top' ? null :
              <span className='flex-horizontal--style-3'>
                {tag}
              </span>
          }
        </a>
        {
          type === 'top' ?
            <div className='icon-message'>
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
        type === 'main' ? null :
          renderIconContainer(
            'https://angel.co/jian-wu-12?public_profile=1',
            'AngelList'
          )
      }
    </>
  )
}

export default React.memo(SideNavLinks);