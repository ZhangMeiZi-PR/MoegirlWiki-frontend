import './MainContent.css'
import { PreNavBar } from '../Pre-nav-bar-src/Pre-nav-bar.tsx';
import YingXin from '../../../assets/Material/image/2025迎新晚会主KT(2)改标题(1).png';
import { Link } from 'react-router';

interface MainConProps {
  srcName?: string;
}

const srcDetails = [
  {
    script: "这是传媒新主管们的第一个制作任务，也是财大新生们第一次接触到传媒项目组的作品！新主管们要好好负责O!",
    time: "一年一次 每年第一个学期开学初",
  }
]

export function MainContent({ srcName }: MainConProps) {
  return (
    <main className='main-content'>
      <div className='focus-content-padding' >
        <PreNavBar srcName={srcName}/>

        <div className='focus-content doc'>
          <div className='left-content'>
            <div className='page-header'>
              <h1>documents</h1>
            </div>
            <div className='post-list'>
              <div className='post-top-header'>
                <h2>资源汇总</h2>
              </div>
              <div className='doc-display'>
                <div className='doc-content'>
                  <h2>{srcName}</h2>
                  <h4>时间：一年一次 每年第一个学期开学初</h4>
                  <h4>这是传媒新主管们的第一个制作任务，也是财大新生们第一次接触到传媒项目组的作品！新主管们要好好负责O!</h4>
                  <h4>链接：
                    <a
                    href='https://pan.baidu.com/s/1WxQsDemUjxoAPWiI1P1oag?pwd=mmbk'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='resource-link'
                    >
                      百度网盘链接
                    </a>
                    <span className='pan-password'>（ 提取码：mmbk ）</span>
                  </h4>
                </div>
                <img src={YingXin} alt={YingXin}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}