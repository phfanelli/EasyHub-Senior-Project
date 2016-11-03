package gui.alpha;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.text.BadLocationException;
import javax.swing.text.StyledDocument;
import javax.imageio.ImageIO;
import javax.swing.Action;
import javax.swing.Box;
import javax.swing.JTextField;
import javax.swing.JLabel;
import java.awt.Color;
import javax.swing.JButton;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.awt.Font;
import java.awt.Image;
import java.awt.Toolkit;
import javax.swing.JTextPane;
import javax.swing.JScrollBar;
import javax.swing.JScrollPane;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

public class EasyHubGUI extends JFrame {

	private JPanel contentPane;
	private JTextField textField;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					EasyHubGUI frame = new EasyHubGUI();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public EasyHubGUI() {
		setIconImage(Toolkit.getDefaultToolkit().getImage(EasyHubGUI.class.getResource("/resources/icon.png")));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 966, 546);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		//set the image for the frame icon
		
		
		JLabel lblNewLabel = new JLabel("EasyHub");
		lblNewLabel.setFont(new Font("Lucida Handwriting", Font.BOLD, 21));
		lblNewLabel.setBounds(411, 0, 235, 25);
		contentPane.add(lblNewLabel);
		
		textField = new JTextField();	
		textField.setBounds(10, 45, 116, 20);
		contentPane.add(textField);
		textField.setColumns(10);
		
		JTextPane textPane = new JTextPane();
		JScrollPane jsp = new JScrollPane(textPane);
		jsp.setBounds(10, 305, 930, 191);
		contentPane.add(jsp);
		StyledDocument doc = textPane.getStyledDocument();

		JLabel lblBranchName = new JLabel("Command");
		lblBranchName.setBounds(10, 32, 96, 14);
		contentPane.add(lblBranchName);
		
		JButton btnTerminal = new JButton("execute");
		//if button is clicked
		btnTerminal.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				String command = "cmd /C " + textField.getText();
				 
				try {
				    Process process = Runtime.getRuntime().exec(command);
				    String total = "";
				    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
				    String line;
				    while ((line = reader.readLine()) != null) {
				    	doc.insertString(doc.getLength(), line+"\n", null );
				    }
				    
				    reader.close();
				 
				} catch (IOException e) {
				    e.printStackTrace();
				} catch (BadLocationException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
		btnTerminal.setBounds(10, 76, 89, 23);
		contentPane.add(btnTerminal);
		
		//bind enter listener to text field to press execute
		textField.addActionListener(new ActionListener() {
		    public void actionPerformed(ActionEvent e) {
		    	btnTerminal.doClick();
		    	//doClick doesn't publish an actual click event, so i'm making one manually
		    	MouseEvent me = new MouseEvent(btnTerminal, // which
		    			MouseEvent.MOUSE_CLICKED, // what
		    		    System.currentTimeMillis(), // when
		    		    0, // no modifiers
		    		    0, 0, // where
		    		    1, // only 1 click 
		    		    false);
		    	btnTerminal.dispatchEvent(me);
		    	System.out.println("lol");
		    }
		});
		
		
	}
}
