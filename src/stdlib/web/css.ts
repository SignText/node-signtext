
/**
 * Functions for creating styled `<span>` elements.
 */
export const Span = ({
  background(col: string, text: string): string {
    return `<span style="background-color:${col}">${text}</span>`;
  },

  colour(col: string, text: string): string {
    return `<span style="color:${col}">${text}</span>`;
  }
});
