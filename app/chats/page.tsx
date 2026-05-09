import React from 'react'

const page = () => {
    return (
        <main className='min-h-screen flex flex-col items-center '>
            <section>

            </section>

            {/* chats section */}
            <section className='w-150 h-16 bg-slate-400 rounded-full flex flex-col items-center justify-center fixed bottom-16'>
                <input type="text"  className=' w-130 h-14 px-6 focus:0 border-0 focus:ring-offset-0 focus:border-0 '/>
            </section>
        </main>
    )
}

export default page