import { RegistrationNotSupported } from '../../helpers/errors.js';

/*
 * Rejects registration parameter as not supported.
 */
export default function rejectRegistration(ctx, next) {
  if (ctx.oidc.params.registration !== undefined) {
    throw new RegistrationNotSupported();
  }

  return next();
}
