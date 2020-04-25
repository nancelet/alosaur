import { assertEquals } from '../../src/package_test.ts';
import { startServer, fetchWithClose, killServer } from '../test.utils.ts';
const { test } = Deno;


/**
 * Test cases
 */
test({
    name: '[http] default server should response 200, 404',
    async fn(): Promise<void> {
        await startServer("./e2e/default/server.ts");

        try {
            const r1 = await fetchWithClose('http://127.0.0.1:8080/home/query-name');
            const r2 = await fetchWithClose('http://127.0.0.1:8080/home/query-name/');
            const r3 = await fetchWithClose('http://127.0.0.1:8080/');
    
            assertEquals(r1.status, 200);
            assertEquals(r2.status, 404);
            assertEquals(r3.status, 404);
        }

        finally {
            killServer();
        }
    },
});

test({
    name: '[http] default server should response with query',
    async fn(): Promise<void> {
        await startServer("./e2e/default/server.ts");

        try {
            const response = await fetch('http://127.0.0.1:8080/home/query-name?name=john');
            const text = await response.text();
    
            assertEquals(response.status, 200);
            assertEquals(text, "Hey! john")
        }
        finally {
            killServer();
        }

    },
});