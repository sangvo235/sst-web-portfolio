"use client"

import React from 'react'
import {AiFillLinkedin, AiFillGithub, AiFillMail} from 'react-icons/ai';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const Bio = () => {
    
  return (
    <div className='flex flex-col text-center items-center justify-center my-4 md:flex-row-reverse md:space-x-4 md:text-left'>
        <div className='relative mx-auto w-80 h-60 md:w-1/2 md:mt-4'>
            <Image 
                className='object-cover rounded-full'
                src="https://media.myswitzerland.com/image/fetch/w_2160,h_800,c_limit,f_auto,q_auto,e_sharpen:50/https%3A%2F%2Fwww.myswitzerland.com%2F-%2Fmedia%2Fcelum%20connect%2F2022%2F03%2F09%2F06%2F56%2F24%2Fzermatt-peak-matterhorn-glacier-paradise.jpg"
                alt='image'
                fill
            />
        </div>

        <div className='mt-6 font-semibold text-2xl md:text-4xl md:mt-4 md:w-4/5 lg:text-5xl'>
            <h1 className='md:pr-32'>Hello, I'm Sang!</h1>

            <div className='inline-flex my-6 text-xl md:text-2xl lg:text-3xl'> 
                I&#39;m a&nbsp;
                <span className='text-blue-500 text-xl md:text-2xl lg:text-3xl'>
                <Typewriter
                    options={{
                        strings: [
                            'Grad Software Engineer',
                            'Master of IT Graduate',
                            'Coffee Addict ☕',
                            'Sci-fi Book Reader',
                            'Travel Lover',
                            'Gelato Connoisseur',
                            'Fragrance Collector',
                            'Bubble Tea Enthusiast',
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                />
                </span>
            </div>

            <div className="text-4xl lg:text-5xl flex justify-center gap-6 text-gray-600 dark:text-gray-300 md:justify-start md:order-first md:gap-8 lg:gap-12">
                <Link
                    href="/projects"
                    className={`${buttonVariants({ variant: "project" })}`}
                    >
                    Projects
                </Link>
                
                <Link href="https://www.linkedin.com/in/sangvo235/" target="_blank" title="linkedin">
                    <AiFillLinkedin className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer"/>
                </Link>
                <Link href="https://github.com/sangvo235">
                    <AiFillGithub className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer" target="_blank" title="github"/>
                </Link>
                <Link href="mailto:sangvo235@gmail.com" target="_blank" title="email">
                    <AiFillMail className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer"/>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Bio