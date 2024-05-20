import { Inter } from "next/font/google";
import { useEffect, useState, useCallback } from 'react'

const inter = Inter({ subsets: ["latin"] });
import styles from "../styles/container.module.css";
import fonts from '../styles/font.module.css';
import { Leaderboard } from "@/types";
import { leaderboards } from "@/data/leadboard";
import { addCommasToNumber } from "@/helper/utils";

export default function Home() {
  const [scrollY, setScrollY] = useState<number>(0)
  const [screenHeight, setScreenHeight] = useState<number>(768)
  const [screenWidth, setScreenWidth] = useState<number>(1024)
  const [maxScrollHeight, setMaxScrollHeight] = useState<number>(5374)
  const [data, setData] = useState<Leaderboard[]>([])
  const [start, setStart] = useState<number>(0)
  const [limit, setLimit] = useState<number>(8)

  const setupLimit = () => {
    if(limit != 0){
      setLimit(0)
    }else{
      setLimit(8)
    }
  }

  const onScroll = useCallback((event: any) => {
    const { scrollY } = window
    setScrollY(scrollY)
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true })
    setScreenHeight(window.innerHeight)
    setScreenWidth(window.innerWidth)
    setMaxScrollHeight(document.documentElement.scrollHeight)
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional, adds smooth scrolling effect
    });
    setData(leaderboards)
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
       window.removeEventListener("scroll", onScroll)
    }
  }, []);

  return (
    <>
      <main
        className={`flex min-h-screen flex-col justify-start px-24 overflow-hidden ${inter.className}`}
      >
        <div className="absolute h-1/2 w-1/2 left-1/4">
          <img src="images/vector-1.png" className={`absolute h-full w-full z-10`} style={{ position: 'absolute', top: `${9 * scrollY / 10}px` }} />
        </div>
        <div className="absolute h-1/2 w-1/2 left-1/5 left-0 z-0 bottom-0 opacity-50">
          <img src="images/vector-3.png" className="absolute left-0 -bottom-1/2 w-full z-0" style={{ position: 'absolute', top: `${7 * scrollY / 10}px`, left: `${2 * scrollY / 11}px` }} />
        </div>
        <img src="images/daniel-unsplash.png" className="absolute z-0 right-0 z-10 h-11/12 top-16 right-0" style={{ position: 'absolute', top: `${3 * scrollY / 4}px` }} />
        <div className="flex flex-row items-center justify-center min-w-screen py-4 z-10">
          <div className="flex max-w-sm rounded-full p-0.5 mx-2">
            <button className="flex-1 font-bold text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white bg-transparent">How It Works</button>
          </div>
          <div className="flex max-w-sm rounded-full bg-gradient-to-br from-[#963488] via-[#FC6F32] to-[#FF4A59] p-0.5 shadow-lg mx-2">
            <button className="flex-1 font-bold text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white hover:bg-gradient-to-br">Buy Salt AI</button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start z-10 pt-28 pb-16">
          <h1 className={`items-start justify-start bg-gradient-to-br ${scrollY < 100 ? 'from-[#963488] via-[#FC6F32] to-[#FF4A59]' : 'from-[#FFD6F9] via-[#FFCBB4] to-[#FFBEC3]' } inline-block text-transparent bg-clip-text text-8xl my-16 leading-tight font-bold`}>A new economic primitive<br />for funding decentralized AI</h1>
          <p className="text-white text-2xl">We track, rank and pay for the best open source decentralized LLMs to compete against OpenAI</p>
          <div className="flex flex-row my-10">
            <div className="flex max-w-sm rounded-full bg-gradient-to-br from-[#963488] via-[#FC6F32] to-[#FF4A59] p-0.5 shadow-lg mx-2">
              <button className="flex-1 font-bold text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white hover:bg-gradient-to-br">Buy Salt AI</button>
            </div>
            <div className="flex max-w-sm rounded-full p-0.5 mx-2">
              <button className="flex-1 font-bold text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white bg-transparent">Try Now</button>
            </div>
          </div>
          <div className={`flex flex-row justify-around gap-10 w-full py-0 z-10 ${scrollY < 100 ? 'hidden' : 'fade-in transition-opacity duration-1500 ' }`}>
            <div className={`flex flex-col items-center justify-center rounded-full px-10 py-6 ${styles.gradientLabel} w-full opacity-100 transition-opacity duration-500 ease-in-out`}>
              <span className={`text-white ${styles.numberLabel} ${fonts.customfont} ${styles.counter} text-5xl`}>{addCommasToNumber(1873)}</span>
              <label className="text-white text-base leading-10">LLM models</label>
            </div>
            <div className={`flex flex-col items-center justify-center rounded-full px-10 py-6 ${styles.gradientLabel} w-full opacity-100 transition-opacity duration-500 ease-in-out`}>
              <span className={`text-white ${styles.numberLabel} ${fonts.customfont} ${styles.counter} text-5xl`}>${addCommasToNumber(72470728)}</span>
              <label className="text-white text-base leading-10">Paid to data scientists</label>
            </div>
            <div className={`flex flex-col items-center justify-center rounded-full px-10 py-6 ${styles.gradientLabel} w-full opacity-100 transition-opacity duration-500 ease-in-out`}>
              <span className={`text-white ${styles.numberLabel} ${fonts.customfont} ${styles.counter} text-5xl`}>{addCommasToNumber(6557)}</span>
              <label className="text-white text-base leading-10">Developers</label>
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center z-10 pt-28 pb-16`} style={{ position: 'relative', marginTop: `${(scrollY > screenHeight && scrollY < 2 * screenHeight) ? (screenHeight / 5 + scrollY - screenHeight + 'px') : (screenHeight / 5 + 'px')}`, marginBottom: `${screenHeight / 5 + 'px'}`}}>
          <h1 className="text-white text-5xl my-20 leading-tight font-bold">Projects integrated into the Arrakis AI Ecosystem</h1>
          <div className="relative left-0 top-0 w-full mb-20">
            <div className="flex flex-row items-center gap-4 absolute top-0 overflow-hidden" style={{ position: 'absolute', left: `-${(scrollY > screenHeight && scrollY < 2 * screenHeight) && (scrollY * screenWidth / screenHeight - screenWidth + 'px')}` }}>
              <img src="images/solana.png" className="mx-10" />
              <img src="images/arweave.png" className="mx-10" />
              <img src="images/birrensor.png" className="mx-10" />
              <img src="images/circle.png" className="mx-10" />
              <img src="images/mail.png" className="mx-10" />
              <img src="images/solana.png" className="mx-10" />
              <img src="images/arweave.png" className="mx-10" />
              <img src="images/birrensor.png" className="mx-10" />
              <img src="images/circle.png" className="mx-10" />
              <img src="images/mail.png" className="mx-10" />
              <img src="images/solana.png" className="mx-10" />
              <img src="images/arweave.png" className="mx-10" />
              <img src="images/birrensor.png" className="mx-10" />
              <img src="images/circle.png" className="mx-10" />
              <img src="images/mail.png" className="mx-10" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start z-10 pt-28 pb-16" style={{ position: 'relative', marginTop: `${screenHeight / 2 + 'px'}`, marginBottom: `${screenHeight / 6 + 'px'}`}}>
          <h1 className="text-white text-5xl my-5 leading-tight font-bold">Crowdsourcing our collective<br />intelligence to build the best AI</h1>
          <p className="text-white text-xl my-5">Open source AI has been lagging behind the likes of Google and OpenAI by billions of dollars.</p>
          <p className="text-white text-xl">Salt aims to solve that by rewarding open source developers who contribute to the democratization<br />of AI. We run competitions between AI models to find and reward the best AI models. As a result, our<br />users will be able to access the latest cutting edge AI models.</p>
          <div className="flex flex-row my-10">
            <div className="flex max-w-sm rounded-full bg-gradient-to-br from-[#963488] via-[#FC6F32] to-[#FF4A59] p-0.5 shadow-lg mx-2">
              <button className="flex-1 font-bold text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white hover:bg-gradient-to-br">Use The Cutting Edge AI</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center z-10 pt-28 pb-16">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-white text-4xl">LLM Leaderboard</h1>
            <div className="flex max-w-sm rounded-full bg-gradient-to-br from-[#963488] via-[#FC6F32] to-[#FF4A59] p-0.5 shadow-lg mx-2">
              <button className="flex-1 font-bold text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white hover:bg-gradient-to-br">Submit your model</button>
            </div>
          </div>
          <p className='text-white my-4'>We evaluate LLMs on key benchmarks using the Eleuther AI, a framework to test LLMs on a large number of different evaluation tasks. The higher the score, the better the LLM.</p>
          
          <div className="w-full relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-[#8F99B0]">
                <tr>
                  <th scope="col" className="px-6 py-3 w-10"></th>
                  <th scope="col" className="px-6 py-3">#</th>
                  <th scope="col" className="px-6 py-3">Model Name</th>
                  <th scope="col" className="px-6 py-3">Average</th>
                  <th scope="col" className="px-6 py-3">ARC</th>
                  <th scope="col" className="px-6 py-3">HellaSwag</th>
                  <th scope="col" className="px-6 py-3">MMLU</th>
                  <th scope="col" className="px-6 py-3">TruthfulQA</th>
                  <th scope="col" className="px-6 py-3">Winogrande</th>
                  <th scope="col" className="px-6 py-3">GSM8K</th>
                  <th scope="col" className="px-6 py-3">Usage</th>
                </tr>
              </thead>
              <tbody>
                {
                  data && data.map((item:Leaderboard, index:number) => {
                    if(limit == 0){
                      return <tr key={index} className={`${index % 2 == 1 ? 'bg-[#15171D]' : ''} text-white`}>
                      <td className="p-3 font-medium text-center">
                        <img src={`images/${item.status}.png`} />
                      </td>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.modelName}</td>
                      <td className="px-6 py-4">{item.average}</td>
                      <td className="px-6 py-4">{item.arc}</td>
                      <td className="px-6 py-4">{item.hellaswag}</td>
                      <td className="px-6 py-4">{item.mmlu}</td>
                      <td className="px-6 py-4">{item.truthfulqa}</td>
                      <td className="px-6 py-4">{item.winogrande}</td>
                      <td className="px-6 py-4">{item.gsm8x}</td>
                      <td className="px-6 py-4">{addCommasToNumber(item.usage)}</td>
                    </tr>
                    } else if (index + 1 > start && start + limit > index){
                      return <tr key={index} className={`${index % 2 == 1 ? 'bg-[#15171D]' : ''} text-white`}>
                        <td className="p-3 font-medium text-center">
                          <img src={`images/${item.status}.png`} />
                        </td>
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.modelName}</td>
                        <td className="px-6 py-4">{item.average}</td>
                        <td className="px-6 py-4">{item.arc}</td>
                        <td className="px-6 py-4">{item.hellaswag}</td>
                        <td className="px-6 py-4">{item.mmlu}</td>
                        <td className="px-6 py-4">{item.truthfulqa}</td>
                        <td className="px-6 py-4">{item.winogrande}</td>
                        <td className="px-6 py-4">{item.gsm8x}</td>
                        <td className="px-6 py-4">{addCommasToNumber(item.usage)}</td>
                      </tr>
                    } else {
                      return <tr key={index}></tr>
                    }
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="flex flex-row items-center justify-end w-full my-10">
            <label className={`text-white mx-5 cursor-pointer ${start != 8 && 'hidden'}`} onClick={() => setupLimit()}>View full leaderboard</label>
            <img src="images/arrow-down.png" className={`cursor-pointer ${start != 0 && 'hidden'}`} onClick={() => setStart(8)} />
            <img src="images/arrow-up.png" className={`cursor-pointer ${start != 8 && 'hidden'}`} onClick={() => setStart(0)} />
          </div>

          <div className="flex flex-row items-center justify-between min-h-75 w-full my-20 pe-10" style={{ position: 'relative', marginTop: `${screenHeight / 3 + 'px'}`, marginBottom: `${screenHeight / 3 + 'px'}`}}>
            <div className="flex flex-col items-start justify-start w-100">
              <h1 className="text-white text-6xl my-10">Join our community</h1>
              <p className="text-white text-xl">Join us on our mission to to the moon & revolutionize open source AI development<br />so that we can build a permissionless, democratized, and decentralized AI. </p>
              <p className="text-white text-xl my-5">Let the fate of AI be in our hands and not that of big tech companies.</p>
              <div className="flex flex-row items-center justify-start">
                <img src="images/mail.png" className="me-3" width={30} height={30} />
                <img src="images/twitter.png" className="mx-3" width={30} height={30} />
              </div>
            </div>
            <div className="flex flex-row items-start justify-start w-100 px-10">
              <img src="images/moon.png" className="w-full h-full mx-auto" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between min-h-25 w-full my-20">
          <div className="flex flex-col items-start justify-center w-100">
            <h1 className="text-white text-3xl my-10">Join our community and harvest $SALT</h1>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center min-w-screen py-4 z-10 mt-64">
          <div className="flex max-w-sm rounded-full p-0.5 mx-2">
            <button className="flex-1 text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white bg-transparent">How It Works</button>
          </div>
          <div className="flex max-w-sm rounded-full p-0.5 mx-2">
            <button className="flex-1 text-md px-6 py-3 rounded-full bg-[#0a0c11] text-white bg-transparent">Buy Salt AI</button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center z-10 pb-4 border-t pt-4">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center justify-start">
              <img src="images/mail.png" className="me-3" width={30} height={30} />
              <img src="images/twitter.png" className="mx-3" width={30} height={30} />
            </div>
            <div className="flex mx-2">
              <a href="#" className="text-[#8F99B0] mx-4 hover:text-white text-sm">Terms of Use</a>
              <a href="#" className="text-[#8F99B0] mx-4 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-[#8F99B0] mx-4 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>

      </main>
      <div className="flex flex-col items-center justify-between w-full" style={{position: 'relative', bottom: 520 * screenWidth / 1920 + 360 - ( (maxScrollHeight - scrollY) < screenHeight ? (scrollY - maxScrollHeight + screenHeight) * 2 / 5 : 0) + 'px', height: 0 + 'px'}}>
        <div className="flex flex-row items-center justify-center w-full">
          <img src="images/nasa-unsplash.png" className="w-full" />
        </div>
      </div>
    </>
  );
}
