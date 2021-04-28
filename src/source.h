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

#define CONFIG_SIZE 8
#define MAX_PERIOD

#define HZ_2_DELAY(F) (uint32_t)(1000000/F)

uint64_t cnt;

struct config_t{
    uint8_t c1_toggle;
    uint8_t c2_toggle;
    uint8_t c3_toggle;
    uint8_t c4_toggle;
    uint32_t freq;
};

uint8_t config[CONFIG_SIZE];

struct config_t sys_config;

bool reading_config;

struct repeating_timer read_adc_timer;

bool ADC_Read_Callback(struct repeating_timer *t);

// Get and set configs
void get_config();
void set_config();
int config_inc();