import requests


def send_mail_mailgun(email, subject, body):
    return requests.post(
        "https://api.mailgun.net/v3/sandbox549b612842744e5e8fbc141bb5cb29c7.mailgun.org/messages",
        auth=("api", "fd367a0f07337163b949561d8fec2968-d51642fa-cf8a7f55"),
        data={
            "from": "Ansar Rental <postmaster@sandbox549b612842744e5e8fbc141bb5cb29c7.mailgun.org>",
            "to": email,
            "subject": subject,
            "text": body,
        },
    )
