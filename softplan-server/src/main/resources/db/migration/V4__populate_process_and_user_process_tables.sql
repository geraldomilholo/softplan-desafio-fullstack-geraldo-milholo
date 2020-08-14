-- Cria processos já com parecer
INSERT INTO public.process (id, name, peding, seem) 
VALUES ('4ce1b555-1178-4e20-b611-bbdd97d3d98b', 'Processo 1', false, 'Parecer do processo 1');

INSERT INTO public.process (id, name, peding, seem) 
VALUES ('9063b1e6-6af3-443a-a3da-bada9066364e', 'Processo 2', false, 'Parecer do processo 2');

INSERT INTO public.process (id, name, peding, seem) 
VALUES ('7bad36c9-7acc-4ac4-ac87-bc7502e25ed9', 'Processo 3', false, 'Parecer do processo 3');

-- Cria processos sem parecer
INSERT INTO public.process (id, name, peding, seem) 
VALUES ('7be4f53e-5784-438d-9f89-3954355a64a6', 'Processo 4', true, null);

INSERT INTO public.process (id, name, peding, seem) 
VALUES ('e2cf41bd-5c69-4130-8d44-d580fe936b03', 'Processo 5', true, null);

INSERT INTO public.process (id, name, peding, seem) 
VALUES ('3f731c90-d0d4-4ae4-a73b-64e8d7f5a15f', 'Processo 6', true, null);

-- Processos com parecer pelo usuário 'Usuário-finalizador'
INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('4ce1b555-1178-4e20-b611-bbdd97d3d98b', '4ce1b555-1178-4e20-b611-bbdd97d3d98b', '148fd542-054d-47fe-941a-4bfe7c6d645c');

INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('9063b1e6-6af3-443a-a3da-bada9066364e', '9063b1e6-6af3-443a-a3da-bada9066364e', '148fd542-054d-47fe-941a-4bfe7c6d645c');

INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('7bad36c9-7acc-4ac4-ac87-bc7502e25ed9', '7bad36c9-7acc-4ac4-ac87-bc7502e25ed9', '148fd542-054d-47fe-941a-4bfe7c6d645c');

-- Processo 4 sem parecer vinculado ao usuário 'Usuário-finalizador'
INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('bd400d6f-8aa1-4b3b-812e-23c264482ad3', '7be4f53e-5784-438d-9f89-3954355a64a6', '148fd542-054d-47fe-941a-4bfe7c6d645c');

-- Processo 4 sem parecer vinculado ao usuário 'Usuário-finalizador 2'
INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('6635fc01-b72f-42a6-97fd-7e71b6764261', '7be4f53e-5784-438d-9f89-3954355a64a6', '34f13532-2ebd-4f29-90fc-5680f3633363');

-- Processo 4 sem parecer vinculado ao usuário 'Usuário-finalizador 3'
INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('8dcb4d7e-359e-49eb-9177-dc6e94ae1011', '7be4f53e-5784-438d-9f89-3954355a64a6', '3ffedaa2-e20c-4f78-8d70-225dad019337');

-- Processo 5 sem parecer vinculado ao usuário 'Usuário-finalizador'
INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('df4a5e18-6811-40ca-b759-2a1c14718bba', 'e2cf41bd-5c69-4130-8d44-d580fe936b03', '148fd542-054d-47fe-941a-4bfe7c6d645c');

-- Processo 5 sem parecer vinculado ao usuário 'Usuário-finalizador 2'
INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('f9453c6f-f056-4a80-98e6-2f76fb9ba16a', 'e2cf41bd-5c69-4130-8d44-d580fe936b03', '34f13532-2ebd-4f29-90fc-5680f3633363');

-- Processo 6 sem parecer vinculado ao usuário 'Usuário-finalizador 2'
INSERT INTO public.user_process (id, process_id, user_id) 
VALUES ('3f731c90-d0d4-4ae4-a73b-64e8d7f5a15f', '3f731c90-d0d4-4ae4-a73b-64e8d7f5a15f', '34f13532-2ebd-4f29-90fc-5680f3633363');
