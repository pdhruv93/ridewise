# ridewise

## Idea

Next JS 15 is quite a hot topic on the frontend industry. What better way to do hands on than building a project. I had this ridewise project in past which using React+MUI and was pretty simple. I felt like upgrading it to Next JS 15 to understand the new architecture and at the same time club it with Google's Routing API to build a good solution.

ridewise is a simple web app that lets users create and join a carpool.

## Tech Stack used

- **Frontend:** NextJS 15 + React19 + TypeScipt, [Chakra UI v3](https://chakra-ui.com/)
- **Backend:** [Supabase](https://supabase.com/) with Postgres(DB functions, Triggers)
- **Other:** Zustand for Global state mgmnt, React Hook Form+Zod, [Google Maps Routing API](https://developers.google.com/maps/documentation/routes)

# Why Supabase

I first tried with Google Firestore, its a good solution but the since its a No-SQL approach, creating references, performing joins was quite difficult. With Supabase its a Postgres DB, so things are sorted.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
