#include <stdio.h>
#include <string.h>
#include "pico/stdlib.h"
#include "pico/time.h"
#include "hardware/gpio.h"
#include "hardware/adc.h"
#include "pico/multicore.h"

#define ADC_0  0
#define ADC_1  1
#define ADC_2  2
#define ADC_3  3

#define CONFIG_SIZE 4

#define MAX_HZ 1000000



struct config_t{
    uint32_t freq;
    uint32_t period;
};

uint32_t config;
uint16_t adc_out[4] = {0x0, 0x0, 0x0, 0x0};


struct config_t sys_config;

bool reading_config;

// Get and set configs
void get_config();
void set_config();
int config_inc();