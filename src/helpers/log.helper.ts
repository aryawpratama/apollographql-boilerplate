import colors from 'colors';

export const logHelper = () => {
  console.log(
    `     
    Your Application Name
  `.cyan,
  );
  console.log('    Application Environtment'.yellow);
  console.log(
    `
    isDev = ${
  process.env.NODE_ENV === 'development'
    ? colors.green('true')
    : colors.red('false')
} | isStaging = ${
  process.env.NODE_ENV === 'staging'
    ? colors.green('true')
    : colors.red('false')
} | isProd = ${
  process.env.NODE_ENV === 'production'
    ? colors.green('true')
    : colors.red('false')
}
    `,
  );
};
