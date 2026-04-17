'use client'

function Comment() {
  return (
    <article className="flex flex-col gap-1">
      <header className="flex gap-2">
        <span className="font-semibold text-sm text-text-2">@bosteroxsiempre</span>
        <span className="text-sm text-text-3">07-05-2026</span>
      </header>
      <p className='text-sm'>Este ejercicio es hermoso! ❤️</p>
      <footer className="flex gap-2 text-sm">
        <button>▲</button>
        <span>2</span>
        <button>▼</button>
        <button>reply</button>
      </footer>
    </article>
  )
}

export default Comment