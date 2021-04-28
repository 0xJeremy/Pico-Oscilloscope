#include "source.h"

int main(){
    reading_config = false;

    stdio_init_all();
    adc_init();
    // Make sure GPIO is high-impedance, no pullups etc
    adc_gpio_init(26);
    adc_gpio_init(27);
    adc_gpio_init(28);
    adc_gpio_init(29);
    cnt = 0;

    fflush(stdin);
    fflush(stdout);

    sys_config.freq = 1;

    add_repeating_timer_us(HZ_2_DELAY(sys_config.freq), ADC_Read_Callback, NULL, &read_adc_timer);

    multicore_launch_core1(get_config);
    while (1) {
        tight_loop_contents();
    }
}

void get_config(){
    while(1){
        int read_char;
        if ((read_char = config_inc()) != PICO_ERROR_TIMEOUT){
            reading_config = true;
            uint8_t bread = 1;
            config[0] = read_char;
            while(bread < 8 && (read_char = config_inc()) != PICO_ERROR_TIMEOUT){
                config[bread++] = read_char;
            }
            if (bread == CONFIG_SIZE){
                set_config();
            }
            memset(config, 0, CONFIG_SIZE);
            reading_config = false;
        }
    }
}

void set_config(){
    struct config_t temp_config = *((struct config_t *)config);
    sys_config.c1_toggle = temp_config.c1_toggle;
    sys_config.c2_toggle = temp_config.c2_toggle;
    sys_config.c3_toggle = temp_config.c3_toggle;
    sys_config.c4_toggle = temp_config.c4_toggle;
    sys_config.freq = temp_config.freq;

    printf("Toggle %u, %u, %u, %u, Freq = %u\n", 
        sys_config.c1_toggle, sys_config.c2_toggle, sys_config.c3_toggle, sys_config.c4_toggle, sys_config.freq);
    if (sys_config.freq < 1)
        sys_config.freq = 1;

    cancel_repeating_timer(&read_adc_timer);
    add_repeating_timer_us(HZ_2_DELAY(sys_config.freq), ADC_Read_Callback, NULL, &read_adc_timer);
}

int config_inc(){
    return getchar_timeout_us(0);
}


bool ADC_Read_Callback(struct repeating_timer *t) {
    if (reading_config){
        return true;
    }
    uint16_t adc_out[4];
    adc_select_input(ADC_0);
    uint16_t adc_0_raw = adc_read();
    // fwrite(&adc_0_raw, 1, sizeof(adc_0_raw), stdout);

    adc_select_input(ADC_1);
    uint16_t adc_1_raw = adc_read();
    // fwrite(&adc_1_raw, 1, sizeof(adc_1_raw), stdout);
    
    adc_select_input(ADC_2);
    uint16_t adc_2_raw = adc_read();
    // fwrite(&adc_2_raw, 1, sizeof(adc_2_raw), stdout);

    adc_select_input(ADC_3);
    uint16_t adc_3_raw = adc_read();
    // fwrite(&adc_3_raw, 1, sizeof(adc_3_raw), stdout);
    fwrite(".\n",1,2,stdout);
    return true;
}