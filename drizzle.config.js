/** @type { import{"drizzle-kit"}.Config} */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        // url: 'postgresql://AI%20Interview%20Coach_owner:lrNny9JB1zsM@ep-cool-lab-a8v0k499.eastus2.azure.neon.tech/AI%20Interview%20Coach?sslmode=require',
        url: 'postgresql://neondb_owner:npg_KyoUVrY4Hdg6@ep-super-voice-a81u7l89-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
    }
};