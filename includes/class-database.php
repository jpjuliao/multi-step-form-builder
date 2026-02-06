<?php

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

/**
 * Database handler for form submissions
 */
class Database
{

    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'msf_submissions';
    }

    /**
     * Create submissions table on plugin activation
     */
    public function create_table()
    {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS {$this->table_name} (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            form_id bigint(20) NOT NULL,
            user_id bigint(20) DEFAULT NULL,
            submission_data longtext NOT NULL,
            ip_address varchar(100) DEFAULT NULL,
            user_agent varchar(255) DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY form_id (form_id),
            KEY user_id (user_id),
            KEY created_at (created_at)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Save form submission
     */
    public function save_submission($form_id, $data)
    {
        global $wpdb;

        $user_id = get_current_user_id();
        $ip_address = $this->get_client_ip();
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field($_SERVER['HTTP_USER_AGENT']) : '';

        $result = $wpdb->insert(
            $this->table_name,
            array(
                'form_id' => $form_id,
                'user_id' => $user_id ?: null,
                'submission_data' => wp_json_encode($data),
                'ip_address' => $ip_address,
                'user_agent' => $user_agent,
            ),
            array('%d', '%d', '%s', '%s', '%s')
        );

        return $result !== false ? $wpdb->insert_id : false;
    }

    /**
     * Get submissions for a form
     */
    public function get_submissions($form_id, $limit = 50, $offset = 0)
    {
        global $wpdb;

        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE form_id = %d ORDER BY created_at DESC LIMIT %d OFFSET %d",
                $form_id,
                $limit,
                $offset
            )
        );

        // Decode submission data
        foreach ($results as &$result) {
            $result->submission_data = json_decode($result->submission_data, true);
        }

        return $results;
    }

    /**
     * Get total submission count for a form
     */
    public function get_submission_count($form_id)
    {
        global $wpdb;

        return (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$this->table_name} WHERE form_id = %d",
                $form_id
            )
        );
    }

    /**
     * Delete submission
     */
    public function delete_submission($id)
    {
        global $wpdb;

        return $wpdb->delete(
            $this->table_name,
            array('id' => $id),
            array('%d')
        );
    }

    /**
     * Get client IP address
     */
    private function get_client_ip()
    {
        $ip_keys = array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR');

        foreach ($ip_keys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                        return $ip;
                    }
                }
            }
        }

        return '';
    }
}
