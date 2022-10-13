import { json } from '@sveltejs/kit';

// This is like an Express route
 
export function GET(event) {
  // log all headers
  console.log(...event.request.headers);
 
  return json({
    // retrieve a specific header
    userAgent: event.request.headers.get('user-agent')
  });
}