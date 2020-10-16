import React from 'react'
import { useTrail, animated } from 'react-spring'
import './Error.scss'
import { Button } from 'antd';
import {Redirect} from "react-router-dom";

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

export default function Error() {
  const [trail, set] = useTrail(3, () => ({ xy: [0, 0], config: i => (i === 0 ? fast : slow) }))
 
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
        </filter>
      </svg>
      <div className="hooks-main" onMouseMove={e => set({ xy: [e.clientX, e.clientY] })} >
        {trail.map((props, index) => (
            <animated.div key={index} style={{ transform: props.xy.interpolate(trans) }} />
            ))}
      </div>
      <div className="error main">
        <h1>Oops!</h1>
        <h2>No pudimos encontrar la página que busca.</h2>

        <Button type="primary" href="/Bienvenida">Regrésame a la red</Button>
      </div>
            
    </>
  )
}
