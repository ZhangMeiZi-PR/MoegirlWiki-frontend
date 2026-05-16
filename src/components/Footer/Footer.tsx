import './Footer.css';
export function Footer() {
  return (
    <div className='footers'>
      <div className='mega-footer'>
        <div className='left-mega-footer'>
          <h4>关于萌媒百科</h4>
          <h5>另一端的朋友们好呀！我们是本网站的创始人，我们创建萌媒百科的初衷是让传媒项目组的新成员们能够快速了解传媒，并且在日后的实际工作过程中快速搜索到需要的资源，我们把能够搜集到的传媒的所有作品的资源都整合在了这个网站里。</h5>
          <p>希望大家能够玩得开心，Interest is always important than anything!</p>
        </div>
        <div className='right-mega-footer'>
          <header>FOUNDER</header>
          <ul>
            <li className='founder-name'>
              传媒古人们
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}