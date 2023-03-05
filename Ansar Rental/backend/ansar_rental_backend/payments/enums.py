from django.db import models

class Month(models.TextChoices):
    BAISAKH = 'BAISAKH'
    JESTHA = 'JESTHA'
    ASHAR = 'ASHAR'
    SWRAWAN = 'SHRAWAN'
    BHADRA = 'BHADRA'
    ASHWIN = 'ASHWIN'
    KARTIK = 'KARTIK'
    MANGSHIR = 'MANGSHIR'
    POUSH = 'POUSH'
    MAGH = 'MAGH'
    FALGUN = 'FALGUN'
    CHAITRA = 'CHAITRA'

    @staticmethod
    def get_choices():
        return Month.choices