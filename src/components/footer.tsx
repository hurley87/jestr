import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-jestr-background py-6">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between mx-auto">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Jestr.world. All rights reserved.
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Built by{" "}
          <Link
            href="https://circus.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-jestr-yellow"
          >
            Circus Industries
          </Link>
        </p>
      </div>
    </footer>
  )
}

