import { InvalidRequest } from '../../helpers/errors.js';

/*
 * Validates the max_age parameter and handles max_age=0 to prompt=login translation
 */
export default function checkMaxAge(ctx, next) {
  if (ctx.oidc.params.max_age !== undefined) {
    const maxAge = +ctx.oidc.params.max_age;

    if (!Number.isSafeInteger(maxAge) || Math.sign(maxAge) === -1) {
      throw new InvalidRequest('invalid max_age parameter value');
    }

    if (maxAge === 0) {
      const { prompts } = ctx.oidc;
      ctx.oidc.params.max_age = undefined;
      if (!prompts.has('login')) {
        prompts.add('login');
        ctx.oidc.params.prompt = [...prompts].join(' ');
      }
    }
  }

  return next();
}
