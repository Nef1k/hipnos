SHELL := /bin/bash

project_name = hipnos
certificate_name = $(project_name)_certificate
domain_name = $(project_name).local

certs_root = ./data/nginx/certs
cert_key_path = $(certs_root)/private.key
cert_path = $(certs_root)/certificate.crt

install_distros:
	apt install -y ca-certificates libnss3-tools

set_local_hosts:
	echo "127.0.0.1 $(domain_name).local">>/etc/hosts

generate_certs:
	echo "Generating certificates"
	openssl req \
		-x509 \
		-keyout $(cert_key_path)\
		-out $(cert_path) \
		-newkey rsa:4096 \
		-sha256 \
		-days 3650 \
		-nodes \
		-subj "/CN=$(domain_name)" \
		-addext "subjectAltName=DNS:$(domain_name),IP:127.0.0.1"

add_certs_chrome:
	echo "Adding certificate to chrome"

	certutil -d sql:$(HOME)/.pki/nssdb -A -t TC -n $(certificate_name) -i $(cert_path)

add_certs_ubuntu:
	echo "Adding certificates to ubuntu is not implemented yet"

root_set_https_dev_env: set_local_hosts install_distros
set_https_dev_env: generate_certs add_certs_chrome add_certs_ubuntu
