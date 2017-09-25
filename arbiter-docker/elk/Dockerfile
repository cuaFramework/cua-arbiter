FROM sebp/elk

RUN rm -rf /etc/logstash/conf.d/02-beats-input.conf
ADD ./02-beats-input.conf /etc/logstash/conf.d/02-beats-input.conf
RUN rm -rf /etc/logstash/conf.d/30-output.conf
ADD ./30-output.conf /etc/logstash/conf.d/30-output.conf