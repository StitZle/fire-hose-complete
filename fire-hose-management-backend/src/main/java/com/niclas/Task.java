package com.niclas;

import com.niclas.repository.OrderRepository;

import java.io.IOException;


public class Task {

    private final OrderRepository orderRepository;

    public Task(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    //@Scheduled(cron = "0 0 0 L * *")
    // Should run at every end of the Month 12:00 PM
    public void monthEndSchedule() throws IOException {
        //Build PDF
        //Send Mail

        //Build CSV
        //Send CSV



    }

}
