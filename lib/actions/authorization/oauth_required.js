import presence from '../../helpers/validate_presence.js';

/*
 * Validates presence of mandatory OAuth2.0 parameters response_type, client_id and scope.
 */
export default function oauthRequired(ctx, next) {
  // Validate: required oauth params
  presence(ctx, 'response_type', 'client_id');

  return next();
}
