import React from 'react';

export default function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-xl">
        <div className="mt-24 sm:mt-32 lg:mt-16">
          <a href="#" className="inline-flex space-x-6">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              Latest updates
            </span>
            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
              <span>Just shipped v1.0</span>
              {/* <ChevronRightIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                /> */}
            </span>
          </a>
        </div>

        <h1 className="mt-10 text-4xl max-w-xl mx-auto text-center w-full font-bold tracking-tight text-white sm:text-6xl">
          Split videos with AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Use AI to take video interviews and intelligently split them into
          individual answers that you can use in your content.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <a
            href="/sign-in"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Get started
          </a>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-white">
              Live demo <span aria-hidden="true">→</span>
            </a> */}
        </div>
      </div>
    </div>
  );
}
