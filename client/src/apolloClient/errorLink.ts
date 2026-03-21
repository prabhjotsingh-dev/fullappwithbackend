import { Observable } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { refreshAccessToken } from "./refreshToken";

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
    console.log("Error", error);

    if (CombinedGraphQLErrors.is(error)) {
        for (const err of error.errors) {
            if (err.message === "not authenticated" || err.message === "Unauthorized") {

                if (operation.operationName === "RefreshToken") {
                    return;
                }
                return new Observable((observer) => {
                    refreshAccessToken()
                        .then((newToken) => {
                            if (!newToken) {
                                return observer.error(err);
                            }

                            const oldHeaders = operation.getContext().headers;

                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    Authorization: `Bearer ${newToken}`,
                                },
                            });

                            // Retry the operation
                            const subscriber = {
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer)
                            };

                            forward(operation).subscribe(subscriber);
                        })
                        .catch((refreshErr) => {
                            observer.error(refreshErr);
                        });
                });
            }
        }
    }
});