import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player'; 


function ErrorPage() {
  return (
    
    <main className="h-screen flex items-center justify-center overflow-hidden bg-background px-6 py-16 sm:py-32 lg:px-8 ">
      <div className="text-center">
        
        <Player
          autoplay
          loop
          src="/error.json" 
          style={{ height: '200px', width: '200px' }}
        />

        <p className="text-base font-semibold font-body text-secondary2">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold font-headings tracking-tight text-black sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg font-semibold font-body text-black sm:text-l/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-secondary2 px-3.5 py-2.5 font-body text-sm font-semibold text-white shadow-sm"
          >
            Go back home
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-black font-body bg-secondary1 px-3.5 py-2.5 rounded-md"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
