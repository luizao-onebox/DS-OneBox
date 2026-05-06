import { clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-2xl", "display-xl", "display-lg", "display-md", "display-sm",
            "h1", "h2", "h3", "h4", "h5", "h6",
            "body-xl", "body-lg", "body-md", "body-sm", "body-xs",
            "label-xl", "label-lg", "label-md", "label-sm", "label-xs",
            "code-lg", "code-md", "code-sm", "code-xs"
          ]
        }
      ]
    }
  }
})

export function cn(...inputs) {
  return customTwMerge(clsx(inputs))
}