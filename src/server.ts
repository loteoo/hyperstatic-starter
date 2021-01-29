import Koa from 'koa';
// import logger from 'koa-logger';



const app = new Koa();

const hostname = '127.0.0.1';
const port = 3000;
const baseUrl = `http://${hostname}:${port}`;

// app.use(logger());

app.use(async (ctx, next) => {

  console.log(ctx.url)
  console.log(ctx.path)
  console.log(ctx.href)

  ctx.body = 'HELO'
});



// Error handling

const serializeError = (key: string, value: any) => {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      ...value,
    }
  }

  return value
}

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;

    // This makes non-enumerable properties like error.message visible
    // Stringyfied and parsed back to an object to let koa set the response header as JSON automatically.
    ctx.body = JSON.parse(JSON.stringify({ error }, serializeError));

    ctx.app.emit('error', error, ctx);
  }
});

app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});



app.listen(port);

console.log(`Server running at ${baseUrl}`);
