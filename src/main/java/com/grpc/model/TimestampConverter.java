package com.grpc.model;

import com.google.protobuf.Timestamp;

import java.util.Date;

public class TimestampConverter {
    public static Timestamp convertDateToTimestamp(Date javaDate) {
        long milliseconds = javaDate.getTime();
        long seconds = milliseconds / 1000;
        int nanos = (int) ((milliseconds % 1000) * 1000000);

        return Timestamp.newBuilder()
                .setSeconds(seconds)
                .setNanos(nanos)
                .build();
    }
}
