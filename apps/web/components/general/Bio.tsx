"use client";

import Image from "next/image";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";
import { buttonVariants } from "@/components/ui/button";

export function Bio() {
  return (
    <div className="flex flex-col text-center items-center justify-center md:flex-row-reverse md:space-x-4 md:text-left">
      <div className="relative mx-auto w-80 h-60 md:w-4/5 md:mt-4">
        <Image
          src="https://sang-vo-sst-web-portfolio-app.s3.ap-southeast-2.amazonaws.com/bio/appenzell_bio_bg.png"
          alt="Bio background image"
          fill
          className="object-cover rounded-full"
        />
      </div>

      <div className="mt-6 font-semibold text-2xl md:text-4xl md:mt-4 md:w-4/5 lg:text-5xl">
        <h1 className="md:pr-32">Hello, I'm Sang!</h1>

        <div className="inline-flex my-6 text-xl md:text-2xl lg:text-3xl">
          I&#39;m a&nbsp;
          <span className="text-blue-500 dark:text-blue-400 text-xl md:text-2xl lg:text-3xl">
            <Typewriter
              options={{
                strings: [
                  "Grad Software Engineer",
                  "Master of IT Graduate",
                  "Coffee Addict ☕",
                  "Sci-fi Book Reader",
                  "Traveller",
                  "Gelato Connoisseur",
                  "Fragrance Collector",
                  "Bubble Tea Enthusiast",
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

          <Link
            href="https://www.linkedin.com/in/sangvo235/"
            target="_blank"
            title="linkedin"
          >
            <AiFillLinkedin className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer" />
          </Link>
          <Link href="https://github.com/sangvo235">
            <AiFillGithub
              className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer"
              target="_blank"
              title="github"
            />
          </Link>
          <Link href="mailto:sangvo235@gmail.com" target="_blank" title="email">
            <AiFillMail className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
}
