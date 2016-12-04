import React from 'react'
import logo from '../js/logo'

const style = {
  g: {
    fill: 'none',
    strokeWidth: 1,
    stroke: 'none'
  },
  path: {
    fillOpacity: 0.9,
    fill: '#000'
  }
}

// TODO props.link
class Logo extends React.Component {
  componentDidMount() {
    logo.init()
  }

  render() {
    return (
      <a className="site-logo" href="/">
        <svg id="logo" xmlns="http://www.w3.org/2000/svg" width="162" height="64" viewBox="0 0 646 256">
          <g style={style.g}>
            <rect x="54" y="54" width="148" height="148" rx="17" fill="#54C458" />
            <g fill="#337836">
              <path className="rec" d="M41.9 87C41.9 94.9 48 101.4 55.8 102L132.9 102.1C140.8 101.5 147.1 95 147.1 87 147.1 79 140.8 72.5 132.9 72L55.8 72C48 72.6 41.9 79.1 41.9 87Z" />
              <path className="rec" d="M84.9 154C77.1 154.6 71 161.1 71 169 71 176.9 77.1 183.4 84.9 184L142 184C149.9 183.5 156.2 177 156.2 169 156.2 161 149.9 154.5 142 154L84.9 154Z" />
              <path className="rec" d="M92.6 128.1C92.6 136 98.8 142.5 106.5 143.1L168 143.2C175.9 142.7 182.1 136.1 182.1 128.1 182.1 120.1 175.9 113.6 168 113.1L106.5 113.1C98.8 113.7 92.6 120.2 92.6 128.1Z" />
              <ellipse cx="198.4" cy="87" rx="15.1" ry="15" />
              <ellipse cx="198.1" cy="169" rx="15.1" ry="15" />
              <ellipse cx="61.9" cy="128.1" rx="15.1" ry="15" />
            </g>
            <path d="M264 161.2C273.1 169.5 284.2 174.4 296.1 174.4 312.1 174.4 326.2 163.6 326.2 148 326.2 118.4 285.2 122.8 285.2 108.6 285.2 101.8 292.4 99.1 298.9 99.1 304.7 99.1 310.7 101.6 314.2 104.8L323.1 92.3C314.8 86.1 306.4 84 297.4 84 282.7 84 268.1 93 268.1 108.7 268.1 118.6 273.6 124.7 280.6 128.7 292.5 135.6 309 137 309 148.3 309 154.7 303.7 159.3 296.1 159.3 288 159.3 280.2 155.2 275.2 149.6L264 161.2ZM378.3 203.2L394.8 203.2 394.8 112.2 379 112.2 379 121.7C378.7 117 372.6 111 361 111 344.2 111 330.8 124.8 330.8 142.7 330.8 151 333.8 158.5 338.6 164.1 344.1 170.3 352.7 174.4 361.9 174.4 372.5 174.4 378 168.7 378.3 164.1L378.3 203.2ZM378.3 151.8C375.2 156.3 369.7 159.3 363.5 159.3 354.2 159.3 347.3 152.3 347.3 142.7 347.3 134 353.5 126 363.1 126 369.5 126 374.9 129.1 378.3 133.6L378.3 151.8ZM429.4 174.4C439.3 174.4 445.8 168.7 446.1 163.7L446.1 173.1 461.9 173.1 461.9 112.2 445.4 112.2 445.4 151.8C443.2 154.7 438.1 159.3 431.1 159.3 427.9 159.3 424.4 158.3 421.8 155.5 419.9 153.4 418.8 150.6 418.8 145.1L418.8 112.2 402.3 112.2 402.3 144.5C402.3 153.5 404.6 159.8 408.5 164.6 413.3 170.5 420.9 174.4 429.4 174.4L429.4 174.4ZM516.6 151.8C513.4 156.3 508 159.3 501.7 159.3 492.5 159.3 485.5 152.3 485.5 142.7 485.5 134 491.7 126 501.4 126 507.7 126 513.2 129.1 516.6 133.6L516.6 151.8ZM517.2 173.1L533.1 173.1 533.1 112.2 517.2 112.2 517.2 121.7C517 117 510.9 111 499.2 111 482.5 111 469 124.8 469 142.7 469 151 472.1 158.5 476.9 164.1 482.3 170.3 491 174.4 500.1 174.4 511.1 174.4 517.2 168.3 517.2 163.7L517.2 173.1ZM587.8 151.8C584.6 156.3 579.1 159.3 572.9 159.3 563.6 159.3 556.7 152.3 556.7 142.7 556.7 134 562.9 126 572.5 126 578.9 126 584.3 129.1 587.8 133.6L587.8 151.8ZM588.4 173.1L604.2 173.1 604.2 84 587.8 84 587.8 121.3C587.2 116.4 581.5 111 570.4 111 553.6 111 540.2 124.8 540.2 142.7 540.2 151 543.2 158.5 548 164.1 553.5 170.3 562.1 174.4 571.3 174.4 582.3 174.4 588.4 168.3 588.4 163.7L588.4 173.1Z" style={style.path} />
          </g>
        </svg>
      </a>
    )
  }
}

export default Logo
