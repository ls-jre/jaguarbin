INSERT INTO bins (bin_id, name)
VALUES ('bin01', 'Seed Bin'),
       ('bin02', 'Empty Bin');

INSERT INTO
    requests (
        bin_id_fk,
        request_id,
        created_at,
        header_accept,
        header_content_length,
        header_content_type,
        header_host,
        header_user_agent,
        method,
        path
    )
VALUES
    (
        1,
        'req01-bin01',
        '2023-01-24T04:52:35.165Z',
        '*/*',
        2827,
        'application/json',
        'eozbs4r8idf0cev.m.pipedream.net',
        'Basecamp3 Webhook',
        'POST',
        '/'
    ),
    (
        1,
        'req02-bin01',
        '2023-01-23T04:52:35.165Z',
        '*/*',
        8165,
        'application/json',
        'eozbs4r8idf0cev.m.pipedream.net',
        'GitHub-Hookshot/b591633',
        'GET',
        '/'
    );