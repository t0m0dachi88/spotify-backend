const app=require('./src/app');
const PORT=process.env.PORT || 5000;

app.listen(3000,()=>{
    console.log(`Server is running on port ${PORT}`);
})